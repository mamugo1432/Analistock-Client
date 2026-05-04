import { useNavigate } from "react-router-dom";
import type { CardAuthorProps } from "../../types/authorsType";
import "./CardAuthor.css";
export default function CardAuthor({ author }: CardAuthorProps) {
  const navigate = useNavigate();
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="custom-card p-3 d-flex flex-column justify-content-between h-100">
        <div>
          <h5 className="fw-bold mb-1">{author.fullName}</h5>
          <p className="text-muted small">{author.job}</p>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate("/authors/edit/" + author.idAuthor)}
          >
          ✏️</button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => navigate("/authors/delete/" + author.idAuthor)}
          >
          🗑️</button>
        </div>
      </div>
    </div>
  );
}
