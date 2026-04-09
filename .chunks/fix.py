content = open('/Users/andrewscott/Documents/GitHub/Support-Guide/index.html').read()
target = 'https://youtu.be/BJ1eRTlWDYk</div>\n          </div>\n          </div>\n          <div class="tip-box">'
replacement = 'https://youtu.be/BJ1eRTlWDYk</div>\n          </div>\n          <div class="tip-box">'
if target in content:
    content = content.replace(target, replacement, 1)
    open('/Users/andrewscott/Documents/GitHub/Support-Guide/index.html', 'w').write(content)
    print('Fixed - removed extra closing div')
else:
    print('Not found')
