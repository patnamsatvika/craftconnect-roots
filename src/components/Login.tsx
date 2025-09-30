import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignIn } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UserRole } from '@/types/auth';
import { Loader2, Palette, Hammer, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroArtisan from '@/assets/hero-artisan.jpg';

const Login: React.FC = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user already has a role (check both unsafe and public metadata)
      const existingRole = (user.unsafeMetadata?.role || user.publicMetadata?.role) as UserRole;
      if (existingRole) {
        // Redirect to appropriate dashboard
        navigate(`/${existingRole}`);
      } else {
        // Show role selection
        setShowRoleSelection(true);
      }
    }
  }, [isLoaded, user, navigate]);

  const handleRoleSubmit = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      await user.update({
        unsafeMetadata: {
          role: selectedRole
        }
      });

      toast({
        title: "Role selected successfully!",
        description: `Welcome to CraftConnect as ${selectedRole}`,
      });

      // Redirect to appropriate dashboard
      navigate(`/${selectedRole}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const roleOptions = [
    {
      value: 'customer' as UserRole,
      label: 'Customer',
      description: 'Browse and purchase beautiful handicrafts',
      icon: Palette,
      color: 'craft-teal',
    },
    {
      value: 'artisan' as UserRole,
      label: 'Artisan',
      description: 'Showcase and sell your traditional crafts',
      icon: Hammer,
      color: 'craft-terracotta',
    },
    {
      value: 'admin' as UserRole,
      label: 'Admin',
      description: 'Manage the marketplace platform',
      icon: Shield,
      color: 'craft-deep-red',
    },
  ];

  // Show role selection if authenticated but no role
  if (showRoleSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroArtisan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-craft-terracotta/80 via-craft-mustard/60 to-craft-deep-red/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 texture-overlay"></div>
        </div>

        <Card className="w-full max-w-md z-10 craft-card bg-card/95 backdrop-blur-md animate-fade-in-up">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-serif text-craft-terracotta">
              Choose Your Role
            </CardTitle>
            <CardDescription className="text-base">
              Select how you want to use CraftConnect
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <RadioGroup
                value={selectedRole}
                onValueChange={(value: UserRole) => setSelectedRole(value)}
                className="space-y-3"
              >
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-accent/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedRole(option.value)}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="data-[state=checked]:bg-craft-terracotta data-[state=checked]:border-craft-terracotta"
                      />
                      <Icon className={`h-5 w-5 text-${option.color}`} />
                      <div className="flex-1">
                        <Label
                          htmlFor={option.value}
                          className="font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <Button
              onClick={handleRoleSubmit}
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Setting up your account...
                </>
              ) : (
                'Continue to CraftConnect'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show Clerk SignIn component
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroArtisan})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-craft-terracotta/80 via-craft-mustard/60 to-craft-deep-red/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 texture-overlay"></div>
      </div>

      <div className="z-10">
        <SignIn 
          afterSignInUrl="/"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-card/95 backdrop-blur-md shadow-xl"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;