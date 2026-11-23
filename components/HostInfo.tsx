import Image from "next/image";
import type { Host } from "@/types";

type HostInfoProps = {
  host: Host;
};

export default function HostInfo({ host }: HostInfoProps) {
  return (
    <section className="flex items-center gap-4 border-b pb-6">
      <Image src={host.avatarUrl} alt={host.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
      <div>
        <p className="font-semibold">Anfitriona: {host.name}</p>
        {host.yearsExperience !== undefined && (
          <p className="text-sm text-gray-500">{host.yearsExperience} años de experiencia</p>
        )}
      </div>
    </section>
  );
}
