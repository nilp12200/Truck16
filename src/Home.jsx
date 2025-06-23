
// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-50 to-white">
      
//       {/* Hero Section */}
//       <section className="text-center py-16 px-4">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg" // Lemon icon
//           alt="Lemon Logo"
//           className="w-20 h-20 mx-auto mb-4"
//         />
//         <h1 className="text-4xl font-bold text-yellow-600 mb-4">
//           Welcome to Lemon Software Solution
//         </h1>
//         <p className="text-gray-700 text-lg max-w-2xl mx-auto">
//           We develop modern, scalable ERP solutions designed to streamline operations,
//           enhance productivity, and drive growth for businesses of all sizes.
//         </p>
//       </section>

//       {/* ERP Features */}
//       <section className="py-12 bg-white px-6">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           <div className="p-6 shadow rounded-lg border">
//             <h3 className="text-xl font-semibold text-yellow-600 mb-2">Inventory Management</h3>
//             <p className="text-gray-600">Track, control, and manage your stock levels with ease.</p>
//           </div>
//           <div className="p-6 shadow rounded-lg border">
//             <h3 className="text-xl font-semibold text-yellow-600 mb-2">Billing & Invoicing</h3>
//             <p className="text-gray-600">Create automated invoices and manage customer payments smoothly.</p>
//           </div>
//           <div className="p-6 shadow rounded-lg border">
//             <h3 className="text-xl font-semibold text-yellow-600 mb-2">Reports & Analytics</h3>
//             <p className="text-gray-600">Make data-driven decisions using real-time reports and dashboards.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center py-16 bg-yellow-100 px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">
//           Ready to grow your business?
//         </h2>
//         <p className="text-gray-700 mb-6">
//           Join hundreds of businesses who trust Lemon Software Solution for their ERP needs.
//         </p>
//         <a
//           href="#"
//           className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full transition"
//         >
//           Get a Free Demo
//         </a>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white text-center py-6 mt-auto">
//         <p className="text-sm">
//           © {new Date().getFullYear()} Lemon Software Solution — Building Smart ERP for Smart Businesses.
//         </p>
//       </footer>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 font-sans">
      
      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/60 to-transparent"></div>
        <div className="relative z-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg"
            alt="Lemon Logo"
            className="w-28 h-28 mx-auto mb-8 drop-shadow-lg hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent mb-6 tracking-tight drop-shadow-sm">
            Welcome to Lemon Software Solution
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-2">
            We develop modern, scalable ERP solutions designed to streamline operations,
            enhance productivity, and drive growth for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* ERP Features */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-8 rounded-2xl shadow-xl border border-yellow-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-white to-yellow-50">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Inventory Management</h3>
            <p className="text-gray-600 leading-relaxed">Track, control, and manage your stock levels with ease.</p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-yellow-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-white to-yellow-50">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Billing & Invoicing</h3>
            <p className="text-gray-600 leading-relaxed">Create automated invoices and manage customer payments smoothly.</p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-yellow-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-white to-yellow-50">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Reports & Analytics</h3>
            <p className="text-gray-600 leading-relaxed">Make data-driven decisions using real-time reports and dashboards.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-gradient-to-br from-yellow-100 to-yellow-50 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-50/30 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-gray-700 text-xl mb-8 leading-relaxed">
            Join hundreds of businesses who trust Lemon Software Solution for their ERP needs.
          </p>
          <a
            href="#"
            className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-yellow-600 hover:to-yellow-700"
          >
            Get a Free Demo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg" alt="Lemon Logo" className="w-8 h-8" />
            <span className="font-bold text-lg tracking-wide">Lemon Software Solution</span>
          </div>
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-yellow-400 transition-colors" title="Facebook" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors" title="Twitter" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z"/></svg>
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors" title="LinkedIn" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
          </div>
          <div className="text-center md:text-right text-sm text-gray-300">
            <div>© {new Date().getFullYear()} Lemon Software Solution</div>
            <div className="text-xs mt-1">Building Smart ERP for Smart Businesses.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
