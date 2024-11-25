// "use client";

// import React from "react";
// import MessageBox from "./messageBox";

// const MessageComponent = ({
//   currentUserChatId,
//   currentUser,
// }: {
//   currentUserChatId: string | undefined;
//   currentUser: string | undefined;
// }) => {
//   // Check if either currentUserChatId or currentUser is undefined
//   if (!currentUserChatId || !currentUser) {
//     return (
//       <div className=" h-full ">
//         <div className="pt-10">
//           <hr className="border-gray-500 " />
//           <div className="mt-8 ms-4 ">
//             <span className="py-2 px-4 text-white md:text-lg text-sm  max-w-[80%] rounded-2xl bg-blue-600">
//               Tap on a chat to start a conversation...
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If both currentUserChatId and currentUser are defined, render the main content
//   return (
//     <div className=" flex flex-col overflow-hidden">
//       <MessageBox
//         currentUserChatId={currentUserChatId}
//         currentUser={currentUser}
//       />
//     </div>
//   );
// };

// export default MessageComponent;
