import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

// export function UseUpdateUser() {
//   const queryClient = useQueryClient();
//   const { isLoading: isUpdating, mutate: updateUser } = useMutation({
//     mutationFn: updateCurrentUser,
//     onSuccess: () => {
//       toast.success("USER SUCCESSFULLY UPDATED");
//       queryClient.invalidateQueries({
//         queryKey: ["user"],
//       });
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });
//   return { isUpdating, updateUser };
// }

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("USER SUCCESSFULLY UPDATED");
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateUser };
}

export default useUpdateUser;
