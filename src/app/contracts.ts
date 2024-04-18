import { getContract } from "thirdweb"
import { defineChain } from 'thirdweb/chains'

import { client} from "./client"
// Sepolia
//export const chainById = defineChain(11155111)

// Polygon zkEVM Cardona
export const chainById = defineChain(2442)

export const erc20Contract = getContract({
    client: client,
    // Polygon Farmer reward token ( $CARROT )
    address: "0xe2C5371AF4691007E46B0926A35B4834BCE66089",  
    chain: chainById
})

export const erc1155Farmer = getContract({
    client: client,
    // Polygon Farmer Contract ( Free )
    address: "0x50b45CBAfc25a7670a725e703308859c3334bB61",  
    chain: chainById
})

export const erc1155FarmTools = getContract({
    client: client,
    // Polygon Farmer Tools
    address: "0x9C335aF4c72E4fe28cf2990dC0bb15D8D2426F4B",  
    chain: chainById
})




