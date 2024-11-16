import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import spinner from "@/assets/lottie/loading2.json";
import Image from "next/image";
import { useGetAllUser, useUpdateUserRole } from "@/hooks/user.hook";
import { TUser } from "@/types";
import userDefaultImage from "@/assets/user (3).png";
import { toast } from "sonner";
const AllUsersDataTable = () => {
  const [loadingUser, setLoadingUsers] = useState<{ [key: string]: boolean }>(
    {}
  );

  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "All users";
  const status = searchParams.get("status") || "All users";

  const { data: allUsersData, isLoading } = useGetAllUser(role, status);
  const users = allUsersData?.data || [];

  const { mutate: updateRole } = useUpdateUserRole();

  const handleUpdateUserRole = (user: TUser) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    // Set loading state for the specific user
    //[user._id!] is used to dynamically access or assign a property in an object.square brackets ([]) allow you to reference an object’s property using a dynamic key.
    setLoadingUsers((prev) => ({ ...prev, [user._id!]: true }));

    updateRole(
      { userId: user._id!, role: newRole },
      {
        onSuccess: () => {
          toast.success(`Role updated to ${newRole} successfully`);
        },
        onError: () => {
          toast.error("Failed to update role");
        },
        onSettled: () => {
          // Clear loading state for the specific user
          setLoadingUsers((prev) => ({ ...prev, [user._id!]: false }));
        },
      }
    );
  };

  return (
    <div className="xl:w-full w-[900px] ">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Image",
              "Name",
              "Email",
              "Phone",
              "Gender",
              "Role",
              "Status",
              "IsDeleted",
              "Update Role",
              "Delete",
            ].map((header) => (
              <TableHead key={header} className="font-semibold text-base">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-20">
                <div className="  flex items-center justify-center w-full h-14 ">
                  <Lottie animationData={spinner} loop={true} />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            users?.map((user: TUser) => {
              return (
                <TableRow key={user?._id}>
                  <TableCell>
                    <Image
                      key={user?._id}
                      src={user?.profilePhoto || userDefaultImage}
                      width={80}
                      height={80}
                      className="w-12 h-12 rounded-xl object-cover object-center"
                      alt={`Image for ${user.name}`}
                    />
                  </TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.mobileNumber}</TableCell>
                  <TableCell className="text-center">{user?.gender}</TableCell>
                  <TableCell>
                    {user?.role === "admin" ? "Admin" : "User"}
                  </TableCell>
                  <TableCell>
                    {user?.status === "basic" ? "Basic" : "Premium"}
                  </TableCell>
                  <TableCell className="text-center">
                    {user?.isDeleted ? "Deleted" : "Active"}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleUpdateUserRole(user)}
                      className="flex text-sm items-center justify-center gap-2 bg-[#268bff] text-white w-[120px] h-11 p-3 relative group overflow-hidden"
                    >
                      {loadingUser[user._id!] ? (
                        <div className=" w-7  h-7 border-4 border-dashed rounded-full animate-spin  border-white"></div>
                      ) : (
                        <div>
                          <span className="relative z-10">Change Role</span>
                          <span className="absolute inset-0 bg-[#0b5fbf] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                        </div>
                      )}
                    </button>
                  </TableCell>

                  <TableCell>
                    <button
                      className={` flex  items-center justify-center rounded-md  bg-[#ff3434] text-white  p-3 relative group overflow-hidden`}
                    >
                      <Trash2 className="text-white w-5 h-5 z-10" />
                      <span className="absolute inset-0 bg-[#ff1717] transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsersDataTable;
