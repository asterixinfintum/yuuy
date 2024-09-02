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
        chainId: `11155111`
      }
    });

    console.log('Verification Status:', response.data);
  } catch (error) {
    console.error('Error checking verification status:', error);
  }
}

// Example usage
checkVerificationStatus('1k7arjhnxdisryy3mfnqemaalh9yf5ay25bbkdhucuc5janmyt');