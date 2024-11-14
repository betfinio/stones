import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';

// get env template
const templateFile = Bun.file('.env.example');

// shared env
const shared_name = process.argv[2];
const environment_name = process.argv[3];

const client = new SecretsManagerClient({
	region: 'eu-central-1',
});

const sharedResponse = await client.send(
	new GetSecretValueCommand({
		SecretId: shared_name,
	}),
);
console.log('fetched shared');
const environmentResponse = await client.send(
	new GetSecretValueCommand({
		SecretId: environment_name,
	}),
);
console.log('fetched environment');

const shared = JSON.parse(sharedResponse.SecretString || '');
const environment = JSON.parse(environmentResponse.SecretString || '');

const template = await templateFile.text();

let output = '';

for (const line of template.split('\n')) {
	const data = line.split('=');
	if (data.length === 1) {
		output += `${line}\n`;
	} else if (data.length === 2 && data[0].startsWith('PUBLIC_')) {
		const key = data[0];
		output += `${data[0]}=${environment[key] || shared[key]}\n`;
	} else {
		console.log('skipping:', line);
	}
}
const file = `.env.${shared_name}.local`;
await Bun.write(file, output);
console.log('done');
