from datetime import datetime

from pydantic import BaseModel, Field

class ChallengeCreate(BaseModel):
    title: str = Field(..., description="The title of the civic challenge")
    category: str = Field(..., description="The domain category, e.g., Environment & Water")
    location: str = Field(..., description="The geographical location")
    description: str = Field(..., description="A detailed empirical description of the problem")

class ChallengeResponse(ChallengeCreate):
    id: str = Field(..., description="Unique challenge ID")
    status: str = Field(default="Pending", description="Current status of the challenge")
    created_at: datetime | None = Field(default=None, description="When the challenge was created")
