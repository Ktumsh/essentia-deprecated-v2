"use client";

import { updateProfile } from "@/app/(main)/profile/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, DateInput, DateValue } from "@nextui-org/react";
import { CalendarIcon } from "../icons/icons";

import { useSession } from "next-auth/react";

const ProfileEntries = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState<DateValue | null>(null);
  const router = useRouter();

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!birthdate) {
      alert("Por favor, ingresa una fecha de nacimiento válida.");
      return;
    }

    const formattedBirthdate = birthdate.toString();

    try {
      await updateProfile({ username, birthdate: formattedBirthdate });
      router.push("/");
    } catch (error) {
      alert("Error al completar el perfil.");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-96 text-base-color-h dark:text-base-color-dark-h">
      <div className="bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 p-5 rounded-lg">
        <div className="mb-5">
          <h3 className="text-lg font-medium">Completa tu perfil</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 text-xs">
            <Input
              isClearable
              id="name"
              type="text"
              defaultValue={session?.user?.name}
              label="Nombre"
              labelPlacement="outside"
              placeholder="Ingresa tu nombre completo"
              color="danger"
              variant="underlined"
              classNames={{
                label:
                  "text-xs group-data-[filled-within=true]:left-1 group-data-[filled-within=true]:text-base-color-h dark:group-data-[filled-within=true]:text-base-color-dark-h",
              }}
            />
            <Input
              isClearable
              id="name"
              type="text"
              defaultValue={session?.user?.username}
              label="Nombre de usuario"
              labelPlacement="outside"
              placeholder="Ingresa tu nombre de usuario"
              color="danger"
              variant="underlined"
              onChange={(e) => setUsername(e.target.value)}
              onClear={() => setUsername("")}
              classNames={{
                label:
                  "text-xs group-data-[filled-within=true]:left-1 group-data-[filled-within=true]:text-base-color-h dark:group-data-[filled-within=true]:text-base-color-dark-h",
              }}
            />
            <DateInput
              id="birthdate"
              value={birthdate}
              description={"Este es mi cumpleaños."}
              errorMessage="Por favor, ingresa una fecha válida."
              label={"Fecha de nacimiento"}
              color="danger"
              variant="underlined"
              startContent={<CalendarIcon />}
              onChange={(value) => setBirthdate(value)}
              classNames={{
                label: "text-xs text-base-color-h dark:text-base-color-dark-h",
                innerWrapper: "text-base-color-m dark:text-base-color-dark-m",
              }}
            />
            <div className="flex w-full">
              <Button color="danger" variant="shadow" size="sm" type="submit">
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEntries;
