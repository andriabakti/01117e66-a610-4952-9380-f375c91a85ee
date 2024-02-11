"use client";

type Props = {
  totalLink: number;
  totalVisit: number;
};

export default function LinkStats({ totalLink, totalVisit }: Props) {
  return (
    <div className="container stats mt-10 flex w-[50%] shadow">
      <div className="stat">
        <div className="stat-title font-bold">Total Shortened Link</div>
        <div className="stat-value cursor-default text-blue-500">
          {totalLink}
        </div>
      </div>
      <div className="stat">
        <div className="stat-title font-bold">Total Link Visit</div>
        <div className="stat-value cursor-default text-blue-500">
          {totalVisit}
        </div>
      </div>
    </div>
  );
}
