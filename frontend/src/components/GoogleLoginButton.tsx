import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";

interface GoogleLoginButtonProps {
  onSuccess?: (credentialResponse: CredentialResponse) => void;
  onError?: () => void;
}

const GoogleLoginButton = ({ onSuccess, onError }: GoogleLoginButtonProps) => {
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Login Success:", credentialResponse);
    toast.success("Successfully logged in with Google!");
    if (onSuccess) onSuccess(credentialResponse);
  };

  const handleError = () => {
    console.log("Login Failed");
    toast.error("Google Login failed. Please try again.");
    if (onError) onError();
  };

  return (
    <div className="flex justify-center my-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="filled_blue"
        shape="pill"
      />
    </div>
  );
};

export default GoogleLoginButton;
