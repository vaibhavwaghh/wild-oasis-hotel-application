import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log("FROM SIGN UP", user);
      toast.success(
        "Account successfully created . Please verify the new Account from the users email address"
      );
    },
  });
  return { signup, isLoading };
}

export default useSignUp;
