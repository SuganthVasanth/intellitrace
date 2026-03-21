import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useAuth } from "@/hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Shield, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { user, login, loginDemo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Login Page - User found, navigating to /");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 rounded-xl border border-sidebar-border shadow-2xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">FraudShield 360°</h1>
          <p className="text-muted-foreground">Real-time supply chain fraud detection</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-sidebar-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Sign in to continue</span>
            </div>
          </div>

          <div className="space-y-4">
            <GoogleLoginButton onSuccess={login} />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-sidebar-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-background px-2 text-muted-foreground italic">Or bypass for development</span>
              </div>
            </div>
            <Button 
              onClick={loginDemo} 
              variant="outline" 
              className="w-full py-6 text-sm font-medium border-primary/20 hover:bg-primary/5 transition-colors gap-2"
            >
              <UserIcon className="h-4 w-4" />
              Sign in as Demo User
            </Button>
          </div>
          
          <p className="text-[10px] text-center text-muted-foreground font-mono uppercase tracking-widest">
            Secure enterprise access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
