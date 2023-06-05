import Layout from "../../components/layout";
import VideoPlay from "../../components/videoPlayer";
import {recoverUserInfo} from "../../service/api"
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export  default function Web({info}) {
  const currentDate = new Date();
  const plazoDate = new Date(info.plazo);

  const timeDifference = plazoDate.getTime() - currentDate.getTime();
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return (
    <Layout>
      <div className="flex flex-col text-white w-full h-full items-center">
       <h1>Plazo: {info.plazo}</h1>
        <h2>Time Left: {daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes, {secondsLeft} seconds</h2>
        <VideoPlay id={1} title="title" streaming_url="https://raw.githubusercontent.com/Alextremo123/lista-m3u/main/ALEX"/>
      </div>
    </Layout>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const cokkies  = parseCookies(ctx)
  const { ['Authentication']: token } = cokkies
  if (!token) {
   
    return {
      redirect: {
        destination: `/?message=${encodeURIComponent("Hace Login para acessar servicios")}`,
        permanent: false,
      },
    }
  }

  try{
    const info = await recoverUserInfo(cokkies)
    return {
      props: {
        info
      },
    };
  } catch(e){
    console.log(e)
    return {
      redirect: {
        destination: `/?message=${encodeURIComponent(e.response?.data?.message|| "error")}`,
        permanent: false,
      },
    }
  }
  
}