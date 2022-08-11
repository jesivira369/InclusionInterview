export const getAPITime = (time) => {

const milliseconds = time;

const seconds = Math.floor((milliseconds / 1000) % 60);

const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

 const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
].join(":");

    return formattedTime;
}