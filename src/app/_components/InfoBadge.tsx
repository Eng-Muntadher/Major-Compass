interface InfoBadgeProps {
  emoji: string;
  text: string;
}

function InfoBadge({ emoji, text }: InfoBadgeProps) {
  return (
    <li className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm">
      {emoji} {text}
    </li>
  );
}

export default InfoBadge;
