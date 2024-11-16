import React from 'react';
import { IconLogout } from '@tabler/icons-react';
import { Button } from "@/components/ui/button"; // Asegúrate de ajustar la ruta según tu estructura de proyecto

const LogoutButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Button onClick={handleClick} variant="outline" className="flex items-center gap-2">
      <IconLogout className="h-5 w-5" />
      Sign out
    </Button>
  );
};

export default LogoutButton;