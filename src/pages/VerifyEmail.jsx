import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleVerifyEmail } from "../services/user-service";
import { message } from "antd";

const VerifyEmail = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          setValidUrl(false);
          setIsLoading(false);
          return;
        }

        const response = await handleVerifyEmail(token);
        message.success(response.data);
        navigate("/signin");
      } catch (error) {
        console.error("Error verifying email:", error);
        if (error.response?.data?.errors?.token) {
          console.error(
            "Token validation errors:",
            error.response.data.errors.token
          );
        }
        console.error("Error response:", error.response?.data);
        setValidUrl(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (isLoading) {
    return <div>Verifying email...</div>;
  }

  return (
    <div className="container mt-5 text-center">
      {validUrl ? (
        <div className="alert alert-success">
          <h1>Email verified successfully</h1>
          <p>You can now sign in to your account.</p>
        </div>
      ) : (
        <div className="alert alert-danger">
          <h1>Invalid verification link</h1>
          <p>The email verification link is invalid or has expired.</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
