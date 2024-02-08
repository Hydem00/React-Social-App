import { Route, Routes } from "react-router-dom";
import Post from "./Post/Post";
import ProfileContent from "./ProfileContent/ProfileContent";
import "./Main.scss";

const Main = () => {
  return (
    <main className="main">
      <section className="main__posts">
        <Routes>
          <Route
            path="/"
            element={<Post isPostingActive={true} isCommentingActive={false} />}
          />
          <Route path="/exampleProfile" element={<ProfileContent />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </section>
    </main>
  );
};

export default Main;
