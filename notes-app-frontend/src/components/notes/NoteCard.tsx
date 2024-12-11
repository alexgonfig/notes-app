import React from "react";
import {
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";

export type NoteCardProps = {
  id: number;
  title: string;
  content: string;
  updated_at: string;
};

const NoteCard: React.FC<NoteCardProps> = ({
  id,
  title,
  content,
  updated_at,
}) => {
  return (
    <Grid2
      size={{
        xs: 12,
        sm: 6,
        md: 4,
      }}
      key={id}
    >
      <Card>
        <CardContent>
          <Grid2 container>
            <Grid2 size={{ xs: 6, lg: 8 }}>
              <Chip
                label={
                  "Actualizado el: " + new Date(updated_at).toLocaleString()
                }
              />
            </Grid2>
            <Grid2 size="auto" sx={{ ml: "auto" }}>
              <CardActions>
                <Link to={`/editNote/${id}`}>
                  <EditIcon color="primary" />
                </Link>
                <DeleteIcon color="error" />
              </CardActions>
            </Grid2>
          </Grid2>

          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          <Typography variant="body2">
            {content.length > 100 ? `${content.substring(0, 100)}...` : content}
          </Typography>
          <Link
            to={`note/${id}`}
            style={{
              float: "right",
              marginTop: "24px",
              marginBottom: "24px",
            }}
          >
            <Button size="small" variant="contained" color="primary">
              Ver Nota
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default NoteCard;
