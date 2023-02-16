from m3u_parser import M3uParser
url = "http://xyz.lattv.com.co:8080/get.php?username=Joao8095&password=Joao8095&type=m3u_plus"
useragent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36"
parser = M3uParser(timeout=5, useragent=useragent)
parser.parse_m3u(url)

parser.filter_by('status', 'GOOD')
print(len(parser.get_list()))
parser.to_file('pawan.json')