use std::io::{self, BufRead};
use bs58;

#[test]
fn base58_to_wallet() {
    println!("Enter your key:");
    let stdin = io::stdin();
    let base58 = stdin.lock().lines().next().unwrap().unwrap();
    let wallet = bs58::decode(base58).into_vec().unwrap();
    println!("{:?}", wallet);
}

#[test]
fn wallet_to_base58() {
    let wallet: Vec<u8> = vec![17,202,58,35,111,116,242,12,42,121,206,185,156,23,149,150,78,112,70,193,24,24,52,254,118,37,248,16,20,69,244,120,38,212,60,212,35,63,57,11,70,97,46,201,231,67,234,218,97,55,64,249,123,70,243,162,61,235,223,5,57,249,249,219];
    let base58 = bs58::encode(wallet).into_string();
    println!("{:?}", base58)
}
