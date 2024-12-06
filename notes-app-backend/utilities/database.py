# Reusable function to format query results as a list of dictionaries
async def format_query_result(result) -> list:
    """
    Converts SQLAlchemy query result into a list of dictionaries,
    where each dictionary represents a row with column names as keys.
    """
    return [dict(zip(result.keys(), row)) for row in result.fetchall()]