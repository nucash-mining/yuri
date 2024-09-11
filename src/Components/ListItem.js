import React, { useState } from 'react';
import { listItemForSale } from '../utils/nftMarketplace';

const ListItem = ({ signer }) => {
    const [tokenId, setTokenId] = useState('');
    const [price, setPrice] = useState('');

    const handleListItem = async () => {
        await listItemForSale(signer, tokenId, price);
        alert('Resource listed successfully!');
    };

    return (
        <div>
            <h2>List Resource for Sale</h2>
            <input 
                type="text" 
                value={tokenId} 
                onChange={(e) => setTokenId(e.target.value)} 
                placeholder="Resource Token ID" 
            />
            <input 
                type="text" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="Price in YURI+" 
            />
            <button onClick={handleListItem}>List Resource</button>
        </div>
    );
};

export default ListItem;
