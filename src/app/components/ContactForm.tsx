// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function ContactForm() {
//   const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setSubmitStatus("idle");
//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         setSubmitStatus("success");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch {
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6, delay: 0.3 }}
//       className="bg-secondary/30 dark:bg-secondary-dark/30 rounded-2xl p-8 border border-third dark:border-third-dark backdrop-blur-sm"
//     >
//       <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-6">
//         Proje Teklifi Alın
//       </h3>

//       <div className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
//               Ad Soyad
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Adınızı ve soyadınızı girin"
//               className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark placeholder-subtext dark:placeholder-subtext-dark"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
//               E-posta
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="E-posta adresinizi girin"
//               className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark placeholder-subtext dark:placeholder-subtext-dark"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
//             Konu
//           </label>
//           <input
//             type="text"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             placeholder="Konu başlığı"
//             className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-text dark:text-text-dark mb-2">
//             Mesajınız
//           </label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Projeniz hakkında detaylı bilgi verin..."
//             rows={5}
//             className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark placeholder-subtext dark:placeholder-subtext-dark"
//           ></textarea>
//         </div>

//         <motion.button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="w-full bg-favorite hover:bg-favorite/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           {isSubmitting ? (
//             <>
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               <span>Gönderiliyor...</span>
//             </>
//           ) : (
//             <>
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 />
//               </svg>
//               <span>Mesajı Gönder</span>
//             </>
//           )}
//         </motion.button>

//         {submitStatus === "success" && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-success/10 border border-success/30 text-success px-4 py-3 rounded-lg text-center"
//           >
//             ✓ Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.
//           </motion.div>
//         )}
//         {submitStatus === "error" && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg text-center"
//           >
//             ⚠️ Bir hata oluştu. Lütfen tekrar deneyin.
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }