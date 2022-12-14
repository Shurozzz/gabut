// Module Require
var http = require('http');
var blacklist = new Map();
var lihat = 0;

// Blacklist
var timeout = 10 * 1000;
function add_address(address) {
    blacklist.set(address, Date.now() + timeout);
}

// Create HTTP Server
var server = http.createServer(async function (req, res) {
    //var ip = ((req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) ? req.headers['cf-connecting-ip'].split(', ')[0] : req.headers['x-forwarded-for']  req.headers['x-real-ip']  req.connection.remoteAddress  req.socket.remoteAddress  req.connection.socket.remoteAddress).split(/::ffff:/g).filter(i => i).join(',');
  var ip = require('external-ip')();
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  
    if (req.url == "/growtopia/server_data.php") {
        if (req.method == "POST") {
            lihat++;
            console.log(`[${lihat}] - [GROWTOPIA] ${ip} Login to server`)
            res.write('server|20.100.176.190\nport|17091\ntype|1\n#maint|Simple HTTP Server by NodeJS ~Koboy 1.1  \n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001');
            res.end();
        }
        else {
            if (!blacklist.has(ip)) {
                lihat++;
                console.log(`[${lihat}] - [UNKNOWN] Connection (${ip})`);
                await add_address(ip);
            }
            else {
                var not_allowed = await blacklist.get(ip);
                if (Date.now() > not_allowed + timeout) {
                    blacklist.delete(ip);
                }
                else {
                    console.log(`[UNKNOWN] Blacklisted Connection (${ip})`);
                }
            }
            return req.connection.destroy();
        }
    }
    else {
        // IP Banned (Credit : DafaFlareX)
        process.env.BLACKLIST
        const banned = [ip];
        banned.forEach(ip => {
            if (ip === ip) {
                return res.writeHead(200);
            }
            else {
                return res.end("Banned LOL");
            }
        });
        return req.connection.destroy();
    }
});

server.listen(80);
server.on("connection", async function (socket) {
    let sct = socket.remoteAddress;
    sct = sct.split(/::ffff:/g).filter(i => i).join("");
	if (!blacklist.has(sct)) {
        lihat++;
		console.log(`[${lihat}] - [SOCKET] Connection (${sct}));
		await add_address(sct`);
	}
	else {
		var not_allowed = await blacklist.get(sct);
		if (Date.now() > not_allowed + timeout) {
			blacklist.delete(sct);
		}
		else {
			console.log(`[SOCKET] Blacklisted Connection (${sct})`);
		}
	}
});
server.on("listening", function () { return console.log("HTTP IS UP AT PORT [80]"); });
