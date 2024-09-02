const axios = require('axios');

async function checkVerificationStatus(guid) {
  try {
    const etherscanApiKey = `${process.env.ETHERSCAN_API_KEY}`;
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        apikey: '',
        module: 'contract',
        action: 'checkverifystatus',
        guid: guid,
        chainId: `1`
      }
    });

    console.log('Verification Status:', response.data);
  } catch (error) {
    console.error('Error checking verification status:', error);
  }
}

// Example usage
checkVerificationStatus('haze7kyyrcxygyhes2fkbe5tu4h9av6vz7qgwfh6unhchjatrw');