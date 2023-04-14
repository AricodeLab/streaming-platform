import Layout from "../../components/layout";

import VideoPlay from "../../components/videoPlayer";


export default function Web() {
  return (
    <Layout>
      <div className="flex flex-col text-white w-full h-full items-center">
        <VideoPlay id={1} title="title" streaming_url="https://raw.githubusercontent.com/mario1234563119/tvfs/main/plalistfuls.txt"/>
      </div>
    </Layout>
  );
}
