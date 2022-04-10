export const networkCollections = {
    "0x89" : [
       {
         address: '0xda6815Da959e28C5ce98a72fE37326c2D810a4cf'
       }
    ],
    "0x61" : [
      {
        address: '0xcC0840Fa0B1Fe7B362Da26f23FA3F583261055D4'
      }
  ],
    "0x38": [
        //Add Your Collections here
        {
          address: '0x0d9E30EcAe2cf5bD523cfd9C846B8211451dbFA2'
        }
      ],
    
      "0x1": [
        {
          address: '0x8b4Cb2a8E9E0E957966d47DbC89d1Dea695b03c5'
        }
      ], 
}
export const getCollectionsByChain = (chain) => networkCollections[chain]; 