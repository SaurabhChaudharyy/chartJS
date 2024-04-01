addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request<unknown, CfProperties<unknown>>) {
  // Check if the request method is GET and the request URL matches the expected endpoint
  if (request.method === 'GET' && new URL(request.url).pathname === '/stock-price') {
    // Generate the stock price
    const price = (Math.random() * 10) + 800;
    const responseBody = JSON.stringify({
      price: price.toFixed(2)
    });

    // Create a new response with the stock price and CORS headers
    return new Response(responseBody, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Change * to specific origin if needed
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } else {
    // If the request doesn't match the expected endpoint, return a 404 response
    return new Response('Not Found', { status: 404 });
  }
}
