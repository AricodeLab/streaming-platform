import Layout from "../../components/layout";
import VideoPlay from "../../components/videoPlayer";


export default function Web() {
  return (
    <Layout>
      <div className="flex flex-col text-white w-full h-full items-center">
        <VideoPlay  />
      </div>
    </Layout>
  );
}
