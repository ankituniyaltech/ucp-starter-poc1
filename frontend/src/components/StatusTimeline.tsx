const STAGES = ["discovery", "cart", "session", "order"] as const;

type StatusTimelineProps = {
  stage: (typeof STAGES)[number];
};

export function StatusTimeline({ stage }: StatusTimelineProps) {
  const activeIndex = STAGES.indexOf(stage);

  return (
    <footer className="timeline">
      {STAGES.map((item, index) => (
        <span key={item} data-active={index <= activeIndex}>
          {item}
        </span>
      ))}
    </footer>
  );
}
