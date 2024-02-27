import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { PythonShell } from "python-shell";
import { Response, Request  } from "express";

interface Option{
    mode: "text" | "json" | "binary" | undefined;
    pythonPath: string;
    pythonOptions: string[];
    scriptPath: string;
    args: string[];
}

async function getPlaylistService(data:any, res:Response):Promise<void>{
    const __filename: string = fileURLToPath(import.meta.url);
    const __dirname: string = dirname(__filename);
    const backendPath: string = join(__dirname, "..", "../backend/python_app");
    try{
        const playlistAddress: string = 
        "https://www.youtube.com/playlist?list=PLta1A4corVqsTLierHoDrPxlnSSyoZ8J_";
        
        const options:Option = {
            mode: "text",
            pythonPath: "python",
            pythonOptions: ["-u"],
            scriptPath: backendPath,
            args: [playlistAddress],
        };

        const resultArray:string[] = await PythonShell.run("index.py", options);
        const result: string = resultArray[0];
        const jsonData = JSON.parse(result)
        res.send({data: jsonData});
    }catch(err){
        console.log(err);
        res.send(err);
    };
}  

async function getDownloadPlaylistService(req:Request, res:Response):Promise<void> {
    console.log(req.body);
  
    res.status(200).json(req.body);
  }
  
export default { getPlaylistService, getDownloadPlaylistService};