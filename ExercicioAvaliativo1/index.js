import { MotoristaDAO } from "./classes/motoristaDAO.js";
import { MotoristaCLI } from "./cli.js";
import readline from "readline";

const cli = new MotoristaCLI();
// const DAO = new MotoristaDAO("atlas_cluster", "Motoristas");
// await DAO.dbConnect();
await cli.motoristasDAO.dbConnect();
cli.showMenu();
