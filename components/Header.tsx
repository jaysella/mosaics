import { useOthers } from "@/liveblocks.config";
import mosaics from "@/public/mosaics.png";
import { PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Header({ title }: { title: string }) {
  return (
    <>
      <div className="logo">
        <Image
          alt="Mosaics logo"
          src={mosaics}
          width={1000}
          height={1000}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          priority
        />
      </div>

      <div className="title">
        <h1>{title}</h1>
        <WhoIsHere />
      </div>
    </>
  );
}

function WhoIsHere() {
  const userCount = useOthers((others) => others.length);

  return (
    <div className="who_is_here">
      <PersonIcon />
      <p>{userCount}</p>
    </div>
  );
}
