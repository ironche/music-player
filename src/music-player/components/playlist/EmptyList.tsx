import { ListItem, Skeleton, ListItemAvatar, ListItemText } from '@mui/material';

interface EmptyListProps {
  count: number;
}

export default function EmptyList(props: EmptyListProps) {
  const list = new Array(props.count).fill(0);

  return (
    <>
      {list.map((_, i) =>
        <ListItem key={i}>
          <ListItemAvatar>
            <Skeleton variant="rounded" width={40} height={40}/>
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton/>}
            secondary={<Skeleton/>}
          />
        </ListItem>
      )}
    </>
  );
}
