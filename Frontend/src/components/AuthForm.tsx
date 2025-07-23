// components/AuthForm.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLogin?: boolean;
}

export const AuthForm = ({ title, buttonText, onSubmit, isLogin = true }: AuthFormProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px] shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" required />
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">{buttonText}</Button>
          </form>

          <div className="mt-4 text-center">
            
            <a href="http://localhost:3000/api/auth/google" className="text-sm underline text-blue-500">
              Continue with Google
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
