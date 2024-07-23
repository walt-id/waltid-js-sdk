import axios from 'axios';

export async function getSession(state: string) {
    try {
        const response = await axios.get(
            `https://verifier.portal.walt.id/openid4vc/session/${state}`,
            {
                headers: {
                    Accept: '*/*',
                },
            },
        );
        return { error: false, data: response.data };
    } catch (error) {
        console.error(error);
        return { error: true, data: error };
    }
}

export function waitForSuccess(
    state: string,
    interval = 1000,
) {
    return new Promise(async (resolve, reject) => {
        let result = await getSession(state);

        if (result.error) {
            reject(result.data); // error handling
            return;
        }

        const checkResult = async () => {
            if (!result.data.policyResults) {
                result = await getSession(state);
            } else {
                console.log('Success', result.data);
                clearInterval(intervalId); // Clear the interval
                const credential =
                    result.data.policyResults.results[1].policies[0].result.vc
                        .credentialSubject;
                resolve(credential); // Resolve promise with the success data
            }
        };

        const intervalId = setInterval(checkResult, interval);
    });
}