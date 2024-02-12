import { Route, Routes } from "react-router-dom";
import Post from "./Post/Post";
import "./Main.scss";
import ProfileContent from "./ProfileContent/ProfileContent";
import SearchedProfiles from "./SearchedProfiles/SearchedProfiles";
import SinglePost from "./SinglePost/SinglePost";
import Login from "./Auth/Login";

const Main = () => {
    return (
        <main className="main">
            <section className="main__posts">
                <Routes>
                    <Route index element={<Post isPostingActive={true} isCommentingActive={false} />} />
                    <Route path="exampleProfile" element={<ProfileContent />} />
                    <Route path="searchedProfiles" element={<SearchedProfiles />} />
                    <Route path="singlePost" element={<SinglePost />} />
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </section>
        </main>
    );
};

export default Main;
