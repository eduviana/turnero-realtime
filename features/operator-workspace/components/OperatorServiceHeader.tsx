"use client";

import { BriefcaseMedical } from "lucide-react";
import { useOperatorService } from "../hooks/useOperatorService";
import { SignOutButton } from "@/components/layout/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OperatorServiceHeader() {
  const { operator, service } = useOperatorService();
  console.log(operator, "PPPPPPPPPPPPPPPPPPPPPPPP");

  return (
    <header className="bg-primary">
      <div className="container mx-auto flex justify-between p-6">
        <div className="flex gap-2 items-center">
          <BriefcaseMedical className="h-8 w-8 text-blue-400" />
          <h1 className="text-white text-2xl font-bold">{service.name}</h1>
        </div>

        <div className="mt-1 flex items-center text-white">
          <Avatar className="h-9 w-9 border border-white/20">
            <AvatarImage
              src={operator.profileImage ?? undefined}
              alt={`${operator.firstName ?? ""} ${operator.lastName ?? ""}`}
            />
            <AvatarFallback className="bg-white/20 text-xs font-semibold text-white">
              {operator.firstName?.[0]}
              {operator.lastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
