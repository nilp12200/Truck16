const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});



app.use(cors());


app.use(bodyParser.json());



app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  try {
    const result = await pool.query(
      'SELECT Username, Role, AllowedPlants FROM Users WHERE LOWER(Username) = LOWER($1) AND Password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({
        success: true,
        message: "Login successful",
        role: user.role,
        username: user.username,
        allowedPlants: user.allowedplants,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// // 🔐 Login API
// // app.post("/api/login", async (req, res) => {
// //   const { username, password } = req.body;
// //   try {
// //     const result = await pool.query(
// //       "SELECT * FROM Users WHERE LOWER(Username) = LOWER($1) AND Password = $2",
// //       [username, password]
// //     );
// //     if (result.rows.length > 0) {
// //       res.json({ success: true, message: "Login successful" });
// //     } else {
// //       res.status(401).json({ success: false, message: "Invalid credentials" });
// //     }
// //   } catch (err) {
// //     console.error("SQL error:", err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });
//////////////////////////////////////////////////////////////////////////////////////////////////
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   console.log("Login attempt:", username, password);

//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: "Username and password are required" });
//   }

//   try {
//     const pool = await getPool();
//     const result = await pool
//       .request()
//       .input('username', sql.NVarChar, username)
//       .input('password', sql.NVarChar, password)
//       .query(
//         'SELECT Username, Role, AllowedPlants FROM Users WHERE Username = @username AND Password = @password'
//       );

//     if (result.recordset.length > 0) {
//       const user = result.recordset[0];
//       res.json({
//         success: true,
//         message: "Login successful",
//         role: user.Role,
//         username: user.Username,
//         allowedPlants: user.AllowedPlants
//       });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (err) {
//     console.error("SQL error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT Username, Role, AllowedPlants FROM Users WHERE LOWER(Username) = LOWER($1) AND Password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({
        success: true,
        message: "Login successful",
        role: user.role,
        username: user.username,
        allowedPlants: user.allowedplants
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("SQL error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



app.post('/api/usermaster', async (req, res) => {
  const { username, password, contactNumber, moduleRights, allowedPlants } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const roleString = (moduleRights || []).join(',');
    const plantsString = (allowedPlants || []).join(',');

    await pool.query(
      `INSERT INTO Users (Username, Password, ContactNumber, Role, AllowedPlants)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, password, contactNumber, roleString, plantsString]
    );

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


 

// Get all plant names

app.get('/api/plants', async (req, res) => {
  try {
    const result = await pool.query('SELECT PlantID, PlantName FROM PlantMaster');
    res.json(result.rows); // PostgreSQL uses `.rows`
  } catch (err) {
    console.error('Error fetching plants:', err);
    res.status(500).send('Server error');
  }
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // // Get all plant names                                                                                          
// // app.get('/api/plants', async (req, res) => {                                                                       

// app.get('/api/plants', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT PlantID, PlantName FROM PlantMaster');
//     res.json(result.rows); // return all records with id + name
//   } catch (error) {
//     console.error('Error fetching plant names:', error);
//     res.status(500).json({ error: 'Failed to fetch plant names' });
//   }
// });

// // ✅ Get all plant master records
app.get('/api/plant-master', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM PlantMaster');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ✅ Delete plant by ID
app.delete('/api/plant-master/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM PlantMaster WHERE PlantID = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});




// ✅ Create new plant master record
app.post('/api/plant-master', async (req, res) => {
  const { plantName, plantAddress, contactPerson, mobileNo, remarks } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO PlantMaster (PlantName, PlantAddress, ContactPerson, MobileNo, Remarks) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [plantName, plantAddress, contactPerson, mobileNo, remarks]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// ✅ Update plant by ID
app.put('/api/plant-master/:id', async (req, res) => {
  const { id } = req.params;
  const { plantName, plantAddress, contactPerson, mobileNo, remarks } = req.body;
  try {
    const result = await pool.query(
      'UPDATE PlantMaster SET PlantName=$1, PlantAddress=$2, ContactPerson=$3, MobileNo=$4, Remarks=$5 WHERE PlantID=$6 RETURNING *',
      [plantName, plantAddress, contactPerson, mobileNo, remarks, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ error: 'Failed to update plant' });
  }
});
// ✅ Fixed: Get single plant by ID with camelCase field names
app.get('/api/plantmaster/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
         PlantID AS "plantId", 
         PlantName AS "plantName", 
         PlantAddress AS "plantAddress", 
         ContactPerson AS "contactPerson", 
         MobileNo AS "mobileNo", 
         Remarks AS "remarks" 
       FROM PlantMaster 
       WHERE PlantID = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
});


// 🚚 Truck Transaction API
app.post("/api/truck-transaction", async (req, res) => {
  const { formData, tableData } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Insert into TruckTransactionMaster
    const insertMain = await client.query(
      `INSERT INTO TruckTransactionMaster
        (TruckNo, TransactionDate, CityName, Transporter, AmountPerTon, TruckWeight, DeliverPoint, Remarks, CreatedAt)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        RETURNING TransactionID`,
      [
        formData.truckNo,
        formData.transactionDate,
        formData.cityName,
        formData.transporter,
        formData.amountPerTon,
        formData.truckWeight,
        formData.deliverPoint,
        formData.remarks
      ]
    );
    const transactionId = insertMain.rows[0].transactionid;

    // Insert into TruckTransactionDetails
    for (const row of tableData) {
      const plantResult = await client.query(
        `SELECT PlantId FROM PlantMaster WHERE LOWER(TRIM(PlantName)) = LOWER(TRIM($1)) LIMIT 1`,
        [row.plantName]
      );
      const plantId = plantResult.rows[0]?.plantid;
      if (!plantId) {
        throw new Error(`Plant not found: ${row.plantName}`);
      }
      await client.query(
        `INSERT INTO TruckTransactionDetails
          (TransactionID, PlantId, LoadingSlipNo, Qty, Priority, Remarks, Freight)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          transactionId,
          plantId,
          row.loadingSlipNo,
          row.qty,
          row.priority,
          row.remarks || "",
          row.freight
        ]
      );
    }
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Transaction failed:", error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
});

// 🚚 Fetch Truck Numbers API (CASE INSENSITIVE)
app.get("/api/trucks", async (req, res) => {
  const { plantName } = req.query;
  try {
    const result = await pool.query(
      `SELECT DISTINCT m.TruckNo
       FROM PlantMaster p
       JOIN TruckTransactionDetails d ON p.PlantID = d.PlantId
       JOIN TruckTransactionMaster m ON d.TransactionId = m.TransactionID
       WHERE LOWER(TRIM(p.PlantName)) = LOWER(TRIM($1))
         AND d.CheckInStatus = 0
         AND m.Completed = 0`,
      [plantName]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching truck numbers:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🚚 Update Truck Status API (CASE INSENSITIVE)
app.post("/api/update-truck-status", async (req, res) => {
  const { truckNo, plantName, type } = req.body;
  const client = await pool.connect();
  try {
    // 1. Get TransactionID
    const transactionResult = await client.query(
      `SELECT TransactionID
       FROM TruckTransactionMaster
       WHERE TruckNo = $1 AND Completed = 0
       ORDER BY TransactionID DESC
       LIMIT 1`,
      [truckNo]
    );
    if (transactionResult.rows.length === 0) {
      return res.status(404).json({ message: "❌ Truck not found or already completed" });
    }
    const transactionId = transactionResult.rows[0].transactionid;

    // 2. Get PlantId (CASE INSENSITIVE)
    const plantResult = await client.query(
      `SELECT PlantId FROM PlantMaster WHERE LOWER(TRIM(PlantName)) = LOWER(TRIM($1)) LIMIT 1`,
      [plantName]
    );
    if (plantResult.rows.length === 0) {
      return res.status(404).json({ message: "❌ Plant not found" });
    }
    const plantId = plantResult.rows[0].plantid;

    // 3. Get current status
    const statusResult = await client.query(
      `SELECT CheckInStatus, CheckOutStatus
       FROM TruckTransactionDetails
       WHERE PlantId = $1 AND TransactionID = $2`,
      [plantId, transactionId]
    );
    if (statusResult.rows.length === 0) {
      return res.status(404).json({ message: "❌ Truck detail not found for this plant" });
    }
    const status = statusResult.rows[0];

    // 4. Update check-in or check-out
    if (type === "Check In" && status.checkinstatus === 0) {
await client.query(
  `UPDATE TruckTransactionDetails
   SET CheckInStatus = 1,
       CheckInTime = CURRENT_TIMESTAMP
   WHERE PlantId = $1 AND TransactionID = $2`,
  [plantId, transactionId]
);

    }
    if (type === "Check Out") {
      if (status.checkinstatus === 0) {
        return res.status(400).json({ message: "❌ Please Check In first before Check Out" });
      }
      if (status.checkoutstatus === 0) {
     await client.query(
  `UPDATE TruckTransactionDetails
   SET CheckOutStatus = 1,
       CheckOutTime = CURRENT_TIMESTAMP
   WHERE PlantId = $1 AND TransactionID = $2`,
  [plantId, transactionId]
);

      }
    }


//     // 🚚 Truck Report API (for report page)
// app.get('/api/truck-report', async (req, res) => {
//   const { truckNo } = req.query;
//   try {
//     const result = await pool.query(
//       `SELECT ttd.TransactionID, p.PlantName, ttd.CheckInTime, ttd.CheckOutTime, ttd.Remarks
//        FROM TruckTransactionDetails ttd
//        JOIN PlantMaster p ON ttd.PlantID = p.PlantID
//        JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
//        WHERE ttm.TruckNo = $1
//        ORDER BY ttd.CheckInTime DESC`,
//       [truckNo]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching truck report:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // 🚚 Truck Report API (for report page) — place this **after** your other APIs
app.get('/api/truck-report', async (req, res) => {
  const { truckNo } = req.query;
  try {
    const result = await pool.query(
      `SELECT 
         ttm.TruckNo AS "truckNo",
         p.PlantName AS "plantName",
         ttd.CheckInTime AS "checkInTime",
         ttd.CheckOutTime AS "checkOutTime",
         ttd.LoadingSlipNo AS "loadingSlipNo",
         ttd.Qty AS "qty",
         ttd.Freight AS "freight",
         ttd.Priority AS "priority",
         ttd.Remarks AS "remarks"
       FROM TruckTransactionDetails ttd
       JOIN PlantMaster p ON ttd.PlantID = p.PlantID
       JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
       WHERE LOWER(ttm.TruckNo) = LOWER($1)
       ORDER BY ttd.CheckInTime DESC`,
      [truckNo]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching truck report:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

  // 🚚 Truck Report API (for report page) — place this **after** your other APIs
// app.get('/api/truck-report', async (req, res) => {
//   const { truckNo } = req.query;
//   try {
//     const result = await pool.query(
//       `SELECT 
//         ttm.TruckNo, 
//         p.PlantName, 
//         ttd.CheckInDate,
//         TO_CHAR(ttd.CheckInTime, 'YYYY-MM-DD HH24:MI') as CheckInTime,
//         ttd.CheckOutDate,
//         TO_CHAR(ttd.CheckOutTime, 'YYYY-MM-DD HH24:MI') as CheckOutTime,
//         ttd.LoadingSlip, 
//         ttd.Quantity, 
//         ttd.Freight, 
//         ttd.Priority, 
//         ttd.Remarks
//       FROM TruckTransactionDetails ttd
//       JOIN PlantMaster p ON ttd.PlantID = p.PlantID
//       JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
//       WHERE ttm.TruckNo = $1
//       ORDER BY ttd.CheckInTime DESC`,
//       [truckNo]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching truck report:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// 🚚 Truck Report API (for report page) — place this **after** your other APIs
// app.get('/api/truck-report', async (req, res) => {
//   const { truckNo } = req.query;
//   try {
//     const result = await pool.query(
//       `SELECT 
//         ttm.TruckNo, 
//         p.PlantName, 
//         TO_CHAR(ttd.CheckInTime, 'YYYY-MM-DD HH24:MI') as CheckInTime,
//         TO_CHAR(ttd.CheckOutTime, 'YYYY-MM-DD HH24:MI') as CheckOutTime,
//         ttd.LoadingSlip, 
//         ttd.Quantity, 
//         ttd.Freight, 
//         ttd.Priority, 
//         ttd.Remarks
//       FROM TruckTransactionDetails ttd
//       JOIN PlantMaster p ON ttd.PlantID = p.PlantID
//       JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
//       WHERE ttm.TruckNo = $1
//       ORDER BY ttd.CheckInTime DESC`,
//       [truckNo]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching truck report:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// 🚚 Truck Report API (for report page) — place this **after** your other APIs
app.get('/api/truck-report', async (req, res) => {
  const { truckNo } = req.query;
  try {
    const result = await pool.query(
      `SELECT 
        ttm.TruckNo, 
        p.PlantName, 
        TO_CHAR(ttd.CheckInTime, 'YYYY-MM-DD HH24:MI') as CheckInTime,
        TO_CHAR(ttd.CheckOutTime, 'YYYY-MM-DD HH24:MI') as CheckOutTime,
        ttd.LoadingSlipNo, 
        ttd.Quantity, 
        ttd.Freight, 
        ttd.Priority, 
        ttd.Remarks
      FROM TruckTransactionDetails ttd
      JOIN PlantMaster p ON ttd.PlantID = p.PlantID
      JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
      WHERE ttm.TruckNo = $1
      ORDER BY ttd.CheckInTime DESC`,
      [truckNo]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching truck report:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



    // 5. Recheck updated status
    // 6. Check if all plants for this transaction are checked-in and checked-out
    const allStatusResult = await client.query(
      `SELECT COUNT(*) AS totalplants,
              SUM(CASE WHEN CheckInStatus = 1 THEN 1 ELSE 0 END) AS checkedin,
              SUM(CASE WHEN CheckOutStatus = 1 THEN 1 ELSE 0 END) AS checkedout
         FROM TruckTransactionDetails
         WHERE TransactionID = $1`,
      [transactionId]
    );
    const statusCheck = allStatusResult.rows[0];
    if (
      Number(statusCheck.totalplants) === Number(statusCheck.checkedin) &&
      Number(statusCheck.totalplants) === Number(statusCheck.checkedout)
    ) {
      // All plants completed
      await client.query(
        `UPDATE TruckTransactionMaster
         SET Completed = 1
         WHERE TransactionID = $1`,
        [transactionId]
      );
      return res.json({
        message: "✅ All plants processed. Truck process completed.",
      });
    }
    // 7. Return success for one action
    return res.json({ message: `✅ ${type} successful` });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

// 🚚 Fetch Checked-in Trucks API (CASE INSENSITIVE)
app.get("/api/checked-in-trucks", async (req, res) => {
  const { plantName } = req.query;
  try {
    const result = await pool.query(
      `SELECT DISTINCT m.TruckNo
       FROM PlantMaster p
       JOIN TruckTransactionDetails d ON p.PlantID = d.PlantID
       JOIN TruckTransactionMaster m ON d.TransactionID = m.TransactionID
       WHERE LOWER(TRIM(p.PlantName)) = LOWER(TRIM($1))
         AND d.CheckInStatus = 1
         AND d.CheckOutStatus = 0`,
      [plantName]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching truck numbers:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🚚 Fetch Remarks API (CASE INSENSITIVE)
app.get('/api/fetch-remarks', async (req, res) => {
  const { plantName, truckNo } = req.query;
  try {
    // Step 1: Get PlantID
    const plantResult = await pool.query(
      'SELECT PlantID FROM PlantMaster WHERE LOWER(TRIM(PlantName)) = LOWER(TRIM($1)) LIMIT 1',
      [plantName]
    );
    if (plantResult.rows.length === 0) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    const plantId = plantResult.rows[0].plantid;

    // Step 2: Get TransactionID
    const txnResult = await pool.query(
      'SELECT TransactionID FROM TruckTransactionMaster WHERE TruckNo = $1 LIMIT 1',
      [truckNo]
    );
    if (txnResult.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    const transactionId = txnResult.rows[0].transactionid;

    // Step 3: Fetch Remarks
    const remarksResult = await pool.query(
      `SELECT Remarks 
       FROM TruckTransactionDetails 
       WHERE PlantID = $1 AND TransactionID = $2 LIMIT 1`,
      [plantId, transactionId]
    );
    if (remarksResult.rows.length === 0) {
      return res.status(404).json({ message: 'Remarks not found' });
    }
    const remarks = remarksResult.rows[0].remarks;
    res.json({ remarks });
  } catch (error) {
    console.error('Error fetching remarks:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ Truck quantity per plant chart API
app.get('/api/truck-plant-quantities', async (req, res) => {
  const { truckNo } = req.query;

  try {
    const result = await pool.query(`
      SELECT 
        p.PlantName,
        SUM(ttd.Qty) AS quantity
      FROM TruckTransactionDetails ttd
      JOIN TruckTransactionMaster ttm ON ttd.TransactionID = ttm.TransactionID
      JOIN PlantMaster p ON ttd.PlantID = p.PlantID
      WHERE LOWER(ttm.TruckNo) = LOWER($1)
        AND ttm.Completed = 0
      GROUP BY p.PlantName
      ORDER BY p.PlantName
    `, [truckNo]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching truck quantities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

///////////////////////////////////////////////////////////////////////////
// 👥 GET all users (admin only)
// app.get("/api/users", async (req, res) => {
//   try {
//     const result = await pool.query(
//       `SELECT u.userid, u.username, u.role,
//               ARRAY(
//                 SELECT p."PlantName"
//                 FROM UserPlants up
//                 JOIN PlantMaster p ON p.PlantID = up.PlantID
//                 WHERE up.UserID = u.UserID
//               ) AS plants
//        FROM Users u
//        ORDER BY u.userid`
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 👥 POST create user
// app.post("/api/users", async (req, res) => {
//   const { username, password, role } = req.body;
//   if (!username || !password || !role) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   try {
//     const result = await pool.query(
//       `INSERT INTO Users (Username, Password, Role)
//        VALUES ($1, $2, $3)
//        RETURNING *`,
//       [username, password, role]
//     );
//     res.status(201).json({ message: "User created", user: result.rows[0] });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 🔗 Assign plants to staff
// app.post("/api/user-plants", async (req, res) => {
//   const { userId, plantIds } = req.body;
//   if (!userId || !Array.isArray(plantIds)) {
//     return res.status(400).json({ error: "Invalid data" });
//   }

//   try {
//     await pool.query("BEGIN");
//     await pool.query("DELETE FROM UserPlants WHERE UserID = $1", [userId]);

//     for (const plantId of plantIds) {
//       await pool.query(
//         `INSERT INTO UserPlants (UserID, PlantID)
//          VALUES ($1, $2)`,
//         [userId, plantId]
//       );
//     }

//     await pool.query("COMMIT");
//     res.json({ message: "Plants assigned successfully" });
//   } catch (error) {
//     await pool.query("ROLLBACK");
//     console.error("Error assigning plants:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 🌱 Get user’s plant access
// app.get("/api/user-plants/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT p.PlantID, p.PlantName
//        FROM UserPlants up
//        JOIN PlantMaster p ON up.PlantID = p.PlantID
//        WHERE up.UserID = $1`,
//       [userId]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching user's plants:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// // 🚀 Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });


app.post('/api/users', async (req, res) => {
  const { username, password, contactNumber, moduleRights, allowedPlants } = req.body;

  if (!username || !password || !contactNumber) {
    return res.status(400).json({ message: 'Username, password, and contact number are required.' });
  }

  try {
    const roleString = moduleRights.join(',');
    const plantsString = allowedPlants.join(',');

    await pool.query(
      `INSERT INTO Users (Username, Password, ContactNumber, Role, AllowedPlants)
       VALUES ($1, $2, $3, $4, $5)`,
      [username, password, contactNumber, roleString, plantsString]
    );

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// GET all plants
app.get('/api/plants', async (req, res) => {
  const result = await pool.query('SELECT * FROM plant_master ORDER BY plantname');
  res.json(result.rows);
});

// POST new user
app.post('/api/user-master', async (req, res) => {
  const { username, plantIds } = req.body;

  if (!username || !Array.isArray(plantIds)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userRes = await client.query(
      'INSERT INTO user_master(username) VALUES($1) RETURNING userid',
      [username]
    );
    const userId = userRes.rows[0].userid;

    for (const pid of plantIds) {
      await client.query(
        'INSERT INTO user_plants(userid, plantid) VALUES($1, $2)',
        [userId, pid]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
});






// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

