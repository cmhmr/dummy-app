def render_comment(comment):
    # Vulnerable: No output encoding
    return f'<div>{comment}</div>'
