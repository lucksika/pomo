import { NextPage } from "next";
import Image from "next/image";
import mascot from "../public/pomo_mascot_act_5.png"

const Login: NextPage = () => {
    return (
        <>
        <div className="flex items-center">
            <h1 className="text-bluegray-300 text-5xl font-semibold uppercase">Under Construction</h1>
            <Image alt="" src={mascot} height={200}></Image>
        </div>
        </>
    )
}

export default Login;