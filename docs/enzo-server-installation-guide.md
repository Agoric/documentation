# Enzo Server Installation and Configuration Guide

**Version 2.0 – RTM**  
**Last Updated:** December 1, 2019  
**Tagline:** Any Data. Any Source. Now.

## Contents

- [Pre-Requisites](#pre-requisites)
- [Install Enzo Server](#install-enzo-server)
- [Key Enzo Server Settings](#key-enzo-server-settings)
- [Change sa Password](#change-sa-password)
- [Configure Adapters with Enzo Manager](#configure-adapters-with-enzo-manager)
- [Adapter-Specific Configurations](#adapter-specific-configurations)
- [Managing Logins](#managing-logins)
- [Connecting to Enzo Server](#connecting-to-enzo-server)
- [Adapter Built-In Help](#adapter-built-in-help)
- [Known Issues and Limitations](#known-issues-and-limitations)

## Pre-Requisites

In order to successfully install Enzo Server you will need to have the following configuration:

- Windows 2012 R2 or higher, 64-bit Operating System
- A dedicated instance of SQL Server Express 2016 or higher
- .NET 4.5 must be installed; some adapters may require .NET 4.6 or higher

**Important Note:** Enzo Server uses SQL Server to store its configuration settings and other parameters. Four databases will be created on the SQL Server instance.

For compatibility reasons, it is highly recommended to install a dedicated instance of SQL Server for Enzo Unified. We recommend creating a dedicated SQL Server Instance and naming your instance 'Enzo'.

## Install Enzo Server

Download and start the setup program on the server where Enzo will run; this can be a physical machine, or a virtual machine running locally or in the cloud. There are two setup files available: one for Intel processors and another for AMD processors.

**You must be an administrator on the machine.**

### Installation Changes

The installation will make the following significant changes to your machine:

- A new Windows Service will be created (the name will start with Enzo)
- A new self-signed SSL certificate will be created in the machine certificate store
- Firewall rules will be changed to allow the TCP protocol to communicate on the selected port
- Four databases will be created on the database server
- A shortcut to Enzo Manager will be created on the desktop

## Key Enzo Server Settings

The installer will prompt you for specific information, including:

### SQL Port Configuration
- **The Port** on which Enzo Server will listen for incoming SQL requests
- Default value: **9550** (can be changed if desired)
- This will be the Enzo SQL port
- Enzo Server 2.0 supports SSL connections on its SQL port

### HTTP/HTTPS Ports
- **HTTP and HTTPS ports** for incoming HTTP traffic
- Consider setting the HTTPS port to **443** instead of the default **49550**

### Adapter Selection
During installation, you will be asked to select the Adapters you want to install. Although you can select all available adapters, it is recommended to pick only the adapters you want to use on a production machine for performance and security reasons.

> **Note:** The Enzo Service will start quickly; however the Enzo instance will not be available until all the adapters have loaded, which could take a minute or two.

### Database Server Connection

The Database Server name can be in any of the following formats:

- **ipaddress** (ex: 10.1.1.15)
  - Assumes default instance of SQL Server on port 1433
- **Servername** (ex: laptop-ny)
  - Assumes default instance of SQL Server on port 1433
- **ipaddress,port** (ex: 10.1.1.15,14388)
- **servername\\instance** (ex: localhost\\Enzo)
  - **NOTE:** Make sure the SQL Server Browser service is running
- **.\\instance** (ex: .\\Enzo)
  - **NOTE:** Make sure the SQL Server Browser service is running

## Change sa Password

Enzo Server emulates SQL Server, including the 'sa' administrative account. Upon installation, the 'sa' account has its password set to **password**. 

### Steps to Change sa Password:

1. **Start Enzo Manager** (shortcut should be on your Desktop)
2. **Select File → Connect…** and provide connection information:
   - **Server:** your machine name (or localhost), comma, port (ex: Localhost,9550)
   - **UserId:** sa
   - **Password:** password
3. **Select Configuration → Change 'sa' Password**
   - **Current password:** password
   - **New Password:** your new password
   - **Re-enter password:** your new password
4. **Click OK**

## Configure Adapters with Enzo Manager

Once Enzo Server is installed, many adapters need configuration before use. After installation, only the 'sa' account will be available in the Login dropdown; additional logins require separate configuration.

### Configuration Process:
- Click on an adapter on the left
- Choose **New Config** to create new configuration
- Select existing configuration from list to edit
- Click **Save** after changing values

### Refreshing Configuration Settings

Changes to security settings take effect almost immediately, but configuration changes may require manual refresh using the \`\_configFlush\` command.

**Example:**
\`\`\`sql
EXEC couchbase._configFlush
\`\`\`

## Adapter-Specific Configurations

### Amazon PA
Provides access to Amazon's Product Advertising API.

**Signup URL:** https://aws.amazon.com/api-gateway/

| Parameter | Type | Comment |
|-----------|------|---------|
| associateTag | string | The associate tag provided by Amazon |
| awsAccessKeyId | string | The Access Key identifier |
| awsSecretKey | string | The secret key |
| url | string | The product URL as provided by Amazon |

### Azure Bus
Provides access to Microsoft Azure Service Bus (Queues, Topics and Subscriptions).

**Signup URL:** http://azure.microsoft.com

| Parameter | Type | Comment |
|-----------|------|---------|
| BusNamespace | string | The Azure Bus namespace |
| Name | string | The name of the ACS account |
| Key | string | The access key for the bus |
| Retries | int | Number of automatic retries |

### Azure IoT Hub
Provides access to Microsoft Azure IoT Hub.

**Signup URL:** http://azure.microsoft.com

| Parameter | Type | Comment |
|-----------|------|---------|
| name | string | The name of the IoT Hub |
| connectionStringSecret | string | The Azure connection string to the Hub |
| transportType | String | Enter AMQP |
| startMessageListener | bool | If enabled, Enzo will capture outbound messages using a background thread for devices to retrieve |

### Azure Key Vault
Provides access to Microsoft Azure Key Vault. Requires registering a new application in Azure AD environment.

**Signup URL:** http://azure.microsoft.com

| Parameter | Type | Comment |
|-----------|------|---------|
| clientId | string | The Azure AD Client Id of Enzo |
| connectionSecret | string | The Azure connection string to the Key Vault service |
| keyVaultName | String | The KeyVault name to use |

### Azure Storage
Provides access to Azure Storage information, including Azure Tables, Azure Blobs and Azure Queues.

**Signup URL:** http://azure.microsoft.com

| Parameter | Type | Comment |
|-----------|------|---------|
| Account | string | The Azure Storage Account name |
| Key | string | The Azure Storage Account key |
| UseSSL | bool | 1 to use SSL |
| Retries | int | Number of automatic retries |

### Couchbase
Provides access to Couchbase buckets. Designed for Couchbase version 3.0.

| Parameter | Type | Comment |
|-----------|------|---------|
| userName | string | The bucket user name |
| password | string | The bucket password |
| nodes | string | Comma separated list of couchbase nodes (ex: http://devlap03:8091/pools) |

### CSV
Provides access to flat files and represents them as read-only tables.

**Minimum Required Settings:**

| Parameter | Type | Comment |
|-----------|------|---------|
| Name | string | The name of the CSV definition |
| Column Delimiter | string | The file column delimiter |
| Columns on First Row | bool | Yes if file contains headers |

**Additional:** Columns tab available for specifying column definitions (optional).

### DataGov
Provides access to demographics information from public US Government data sources. No specific configuration required.

### DB
Provides REST access to relational databases, including SQL Server, Oracle and MySQL.

| Parameter | Type | Comment |
|-----------|------|---------|
| connectionString | string | The connection string to the database |
| defaultTimeout | int | The default execution timeout |

### Facebook
Provides access to certain Facebook requests.

| Parameter | Type | Comment |
|-----------|------|---------|
| accessToken | string | The temporary access token for Facebook |

### Files
Provides access to files and directories on your network. No configuration settings required.

### FlightAware
Provides access to FlightAware APIs.

**Signup URL:** http://flightaware.com/account/join/?referer=/account/join/

| Parameter | Type | Comment |
|-----------|------|---------|
| userName | string | The user name of your FlightAware account |
| apiKey | string | The FlightAware API Key |

### FTP
Provides access to files on FTP and FTPS servers through CSV adapter.

| Parameter | Type | Comment |
|-----------|------|---------|
| URI | string | The FTP site address |
| uid | string | The user id of the FTP site |
| pwd | string | The password of the FTP site |
| isPassive | bool | True if using passive FTP connection |
| isBinary | bool | True if accessing binary data (obsolete) |
| isSSL | bool | True if using FTPS |

### Google Analytics
Provides access to Google Analytics.

| Parameter | Type | Comment |
|-----------|------|---------|
| serviceAccountEmail | string | The service account email |
| privateKeyFile | String | The private key file provided by Google |
| certificatePassword | String | The certificate password |
| defaultTableId | String | The default table to access |

### GeoNames
Provides access to Geo-coding information from GeoNames.

**Signup URL:** http://www.geonames.org/login

| Parameter | Type | Comment |
|-----------|------|---------|
| userName | string | The user name of your GeoNames account |

### Insteon
Provides access to Insteon devices (SmartHome HouseLinc devices). Requires driver installation.

**General Info:** http://www.smarthome.com/houselinc.html  
**Driver Download:** http://cache-m2.smarthome.com/manuals/2413U_Drivers.zip

| Parameter | Type | Comment |
|-----------|------|---------|
| commPort | string | The COM port where the device modem is located |

### Integration
Used for generic data integration scenarios. Requires advanced knowledge of Enzo Server platform. Contact support for more information.

### Messaging
Provides access to SMTP servers to send text messages and emails.

| Parameter | Type | Comment |
|-----------|------|---------|
| MailServerType | string | (ignored) |
| FromName | string | The From name |
| FromEmail | string | The From email |
| Host | string | The address of the SMTP host |
| Port | int | The SMTP port number |
| userId | string | The user id for authenticated SMTP servers |
| password | string | The password for authenticated servers |
| enableSSL | bool | True if the SMTP server requires SSL connections |

### Microsoft Active Directory (Msad)
Provides access to Active Directory user management.

| Parameter | Type | Comment |
|-----------|------|---------|
| userName | string | A domain user with sufficient administrative privileges |
| Domain | string | The domain name |
| Password | string | The password for the user |
| Server | string | The domain server name or IP address |

### MSMQ
Provides access to local and remote Microsoft queues (MSMQ). No specific configuration parameters listed.

### RabbitMQ
Provides access to RabbitMQ queues.

| Parameter | Type | Comment |
|-----------|------|---------|
| hostname | string | The machine hostname where RabbitMQ is installed |
| exchange | string | Name of the exchange (leave blank for default) |
| exchangeType | string | Type of exchange (direct, fanout, topic) |
| queueName | string | Name of the queue |
| persist | Int | 1 to persist messages |
| userId | String | User name |
| password | String | Password |
| durable | Bool | 1 to make messages durable |
| autoDelete | Bool | 1 to auto delete old messages |
| exclusive | Bool | 1 to mark the queue as exclusive |
| expiration | Int | Message expiration in milliseconds (0: never expires) |
| DLX | String | Dead letter queue exchange |
| DLXR | String | When DLX specified, changes default routing |

### SalesForce
Provides ability to connect to SalesForce site for read/write operations.

| Parameter | Type | Comment |
|-----------|------|---------|
| userId | string | The user id to impersonate |
| Password | string | The password of the user to impersonate |
| authToken | string | The account AuthToken as provided by SalesForce |

**Additional Features:**
- Virtual tables that abstract SalesForce SOQL queries
- Update records through special Enzo Server handlers accepting XML input

### Shard
Provides ability to connect to multiple databases and adapters in parallel, representing information as single result set.

| Parameter | Type | Comment |
|-----------|------|---------|
| type | string | The type of definition (data, view, shard) |
| connectionString | string | Database connection string or comma-separated list |
| sqlCommand | string | Default SQL command for 'data' connection types |
| options | string | Comma-separated options: strict, breadcrumb, readonly |
| tableName | string | Actual table name for DELETE, INSERT, UPDATE operations |

### SharePoint
Provides access to SharePoint lists and documents. Requires SharePoint 2013 SDK installation.

**SDK Download:** http://www.microsoft.com/en-us/download/details.aspx?id=35585

| Parameter | Type | Comment |
|-----------|------|---------|
| userName | string | SharePoint user with administrative privileges |
| Password | string | The password for the user |
| Url | string | HTTP endpoint (ex: https://mysitename.sharepoint.com/teamsite/) |
| useLookupIds | int | 1 to return lookup values instead of names |

### SQLServer
SQL Server adapter for REST access from mobile and IoT devices with change tracking capabilities.

| Parameter | Type | Comment |
|-----------|------|---------|
| connectionString | string | Database connection string |
| defaultDB | string | Default database name to use |
| appName | string | Application name for connection |
| ssl | Bool | 1 to force SSL connection |
| retries | Int | Number of automatic retries |
| defaultTimeout | Int | Default execution timeout |

### Threading
Provides synchronization capabilities between disconnected devices.

| Parameter | Type | Comment |
|-----------|------|---------|
| resourceGroup | string | Logical name of device group for synchronization |
| defaultTimeout | Int | Default timeout in seconds for threading objects |
| defaultSleep | String | Default sleep duration in seconds OR CRON schedule |

### Twilio
Provides ability to send text messages and make phone calls. Requires Enzo Server to be reachable from Internet for callbacks.

**Signup URL:** https://www.twilio.com/api

| Parameter | Type | Comment |
|-----------|------|---------|
| AccountSid | string | The Twilio account Sid |
| AuthToken | string | The Twilio auth token |
| CallerId | string | Your Twilio caller id |
| defaultCountryCode | string | Your country code (ex: +1) |
| StatusUrl | string | Status URL where Enzo can be reached |
| TwimlUrl | string | Twiml XML URL where Enzo can be reached |
| mediaUrl | string | Media URL where Enzo can be reached |

### Twitter
Provides access to Twitter search and posting. Requires registering a new Application.

**Signup URL:** https://dev.twitter.com/

| Parameter | Type | Comment |
|-----------|------|---------|
| accessToken | string | Your Twitter access token |
| accessTokenSecret | string | Your Twitter access secret |
| apiSecret | string | Your API secret |
| apiKey | string | Your API Key |

### US Census
Accesses US Census data sets.

**Signup URL:** http://www.census.gov/developers/

| Parameter | Type | Comment |
|-----------|------|---------|
| apiKey | string | Your US Census API Key |

### Velleman DMX
Accesses devices through Velleman DMX interface (K8062 DMX lighting controllers). No configuration settings required.

### Weather
Accesses Weather Underground service.

**Signup URL:** https://www.wunderground.com/weather/api/

| Parameter | Type | Comment |
|-----------|------|---------|
| apiKey | string | Your API Key |

### WMI
Accesses the WMI engine.

| Parameter | Type | Comment |
|-----------|------|---------|
| Username | string | UPN name of user to impersonate (null for service account) |
| password | String | The password to use |
| scope | String | Scope for service management connection (cimv2) |
| domain | String | Default domain of management connection |
| enablePrivileges | Bool | True to enable privileges to WMI connection |
| impersonate | String | Impersonation Level (default, impersonate, anonymous, delegate, identify) |
| authenticationLevel | String | Authentication level (default, connect, call, none, packet, packetintegrity, packetprivacy, unchanged) |
| continueOnError | Bool | True to continue on other servers if errors occur |
| defaultComputers | String | Comma-separated list of IP addresses or computer names |

### Zip
Accesses Zip file content. Used along with CSV adapter. No specific configuration parameters listed.

## Managing Logins

The Enzo Manager application allows you to create logins and manage their Access Control List (ACL) for enhanced security.

**Access:** Configuration → Manage Logins

> **Important:** The 'sa' account has access to all features and adapters. Its password should be strong and secured.

### Add/Edit a Login

- **Add:** Click Add button
- **Edit:** Select login and click Edit
- Enter necessary information and click OK
- **Default:** New logins have no adapter access by default

> **Note:** In edit mode, login and password fields are disabled. Use Change Password to modify passwords.

### Adding a Windows Login

Enzo Server 2.0 supports Windows logins (local and Active Directory users).

1. Select **Windows User** option from User Type dialog
2. Complete configuration

> **Note:** Cannot add Windows Groups in current release.

### Enable/Disable a Login

- **Disable:** Select login and click Disable button
- **Enable:** Select disabled login and click Enable button
- Changes take effect immediately

### Change Password

1. Select login ID
2. Click **Change Password**
3. Change takes place immediately

> **Notes:**
> - If changing 'sa' password, reconnect Enzo Manager (File → Connect)
> - Cannot change Windows Login passwords (managed through OS)

### Copy the REST Authentication Key

The REST Authentication Token can be used by REST clients (mobile phones) to connect to Enzo Server.

1. Select login ID
2. Click **Copy Auth Token** button

### Change Login Permissions

1. Select login ID from list
2. Permissions section shows available adapters

#### Enable bsc Access Permission

By default, ACL on bsc database is set to **Deny Access**. To allow login to use adapters:

1. Click on 'bsc' database
2. Set permission to **Grant Access to Adapters**

> **Note:** Permission changes are saved immediately but may take a minute to take effect.

#### Change Adapter Permissions

Select adapter by clicking adapter name under bsc database. Choose from:

- **DENY** access to this adapter
- **GRANT ALL** access to this adapter  
- **GRANT CONNECT** access to this adapter

When granting CONNECT permission, specify which methods are accessible (none by default).

## Connecting to Enzo Server

Once Enzo is configured and running, connect using SQL Server Management Studio (SSMS).

### Connection Steps:

1. Start SSMS
2. Login to Enzo using sa account
   - **Important:** This is Enzo's sa account, not your database server's sa account
   - Use Enzo password
   - For network logins created in Enzo Manager, choose Windows Authentication

### Test Connectivity:

Run the following command:
\`\`\`sql
EXEC Help
\`\`\`

You should see a list of available adapters.

### Troubleshooting:

If you cannot see adapter list, ensure:
- You are connected to Enzo (not local database server)
- You waited a couple of minutes after starting Enzo service for adapters to load

## Adapter Built-In Help

Each adapter provides built-in documentation.

### Get Adapter Help:
\`\`\`sql
EXEC AzureStorage.help
\`\`\`

This returns all available commands for the AzureStorage adapter.

### Get Method-Specific Help:
\`\`\`sql
EXEC AzureStorage.CreateVirtualTable help
\`\`\`

This provides help on the specific CreateVirtualTable method.

## Known Issues and Limitations

The Enzo Server 2.0 RTM build has known issues to be addressed in future releases:

### ADO.NET and Entity Framework
- **Supported:** ADO.NET with SqlCommand object, including SqlParameter support
- **Not Supported:** Entity Framework

### Linked Server
- Linked Server is supported with specific options set
- Contact support for detailed configuration requirements

---

**For technical support and advanced configurations, contact Enzo Server support team.**
