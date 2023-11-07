import readline from "readline";
import { parkingIn, parkingOut, putRandomCars ,data ,totalAveragePrices} from "../src/app/index.js";

let parkingPlacesActually 
let priceDay;
let priceHour;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const main = ()=> { 
rl.question("Enter the number of parking places available: ", (answer1) => {
  parkingPlacesActually = parseInt(answer1);
  rl.question("Enter the value for priceDay: ", (answer2) => {
    priceDay = parseFloat(answer2);
    rl.question("Enter the value for priceHour: ", (answer3) => {
      priceHour = parseFloat(answer3);
      interactWitAdmin()
    });
  });
});
}
const interactWitAdmin =()=>{

  rl.question(
    "'Choose an action (1 for init parking lot ,2 how may places available now, 3 view all data, 4 totalAveragePrices , 5for put random cars ): " ,
    (answer) => {
      if (answer === "1") {
        interactWithUser();
       }
       else if(answer === "2"){
          console.log(`rite now in te parking places ocupated ${Object.keys(data.currentCars).length} and  ${parkingPlacesActually- Object.keys(data.currentCars).length} places available`)
          interactWitAdmin ()
        }
   
         else if(answer === "3"){
        console.log(data) 
        interactWitAdmin()
        }
        else if(answer === "4"){
          console.log(totalAveragePrices(data.paymentHistory));
       
        interactWitAdmin()
        }
        else if(answer === "5"){
          putRandomCars( parkingPlacesActually)
            console.log("success we put randoms cars")
            interactWitAdmin ()
          }
          else {
          console.log("Invalid choice");}
       }
       );
     }
function interactWithUser() {
  rl.question(
    "Choose an action (1 for parkingIn, 2 for parkingOut, ,3 admin 4 to exit): ",
    (answer) => {
      if (answer === "1") {
        rl.question("Enter the entry ID for parkingIn: ", (entryId) => {
          
          parkingIn(parseInt(entryId), parkingPlacesActually );
          interactWithUser();
        });
      } else if (answer === "2") {
        rl.question("Enter the entry ID for parkingOut: ", (entryId) => {
          parkingOut(
            parseInt(entryId),
            parkingPlacesActually,
            priceDay,
            priceHour
          ); // Call parkingOut with the provided entryId
          interactWithUser(); // Continue interacting
        });}
        else if (answer === "3") {
          interactWitAdmin()
        }
     else if (answer === "4") {
        rl.close(); // Exit
      } else {
        console.log("Invalid choice. Please choose 1, 2, or 3.");
        interactWithUser(); // Continue interacting
      }
    }
  );
}

rl.on("close", () => {
  console.log("Exiting...");
  process.exit(0);
});
main()