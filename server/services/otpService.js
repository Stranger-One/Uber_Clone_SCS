export default{
    getOtp: (digit) => {
        const otp = Math.floor(Math.random() * Math.pow(10, digit));
        return otp.toString().padStart(digit, '0');
    }
}