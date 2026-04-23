import type { UcpProfile } from "../types";

type HeaderProps = {
  profile: UcpProfile | null;
};

export function Header({ profile }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>UCP Starter POC</h1>
        <p>React + FastAPI commerce starter</p>
      </div>
      <div className="badge-wrap">
        <span className="badge">{profile?.protocol ?? "UCP"}</span>
        <span className="badge">v{profile?.version ?? "loading"}</span>
      </div>
    </header>
  );
}
