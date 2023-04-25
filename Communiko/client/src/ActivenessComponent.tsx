
export interface Activeness {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  pointTime: Date;
  location: string;
}

interface Props {
  activeness: Activeness;
}

export function activenessComponent({ activeness }: Props) {
  return (
    <ul>
      <li>{activeness.id}</li>
      <li>{activeness.city}</li>
      <li>{activeness.description}</li>
    </ul>
  );
}