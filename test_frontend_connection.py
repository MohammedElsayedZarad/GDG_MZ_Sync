import requests
import json
import time

# Target the Next.js Frontend (which proxies to Backend)
frontend_url = "http://localhost:3000"

print("=" * 60)
print("TESTING FRONTEND -> BACKEND INTEGRATION")
print("=" * 60)

payload = {
    "title": "Frontend Test Project",
    "context": "Testing connection",
    "level": "L1"
}

print(f"\n📡 Sending POST request to: {frontend_url}/api/generate-simulation")
print("   (This tests if Next.js correctly forwards to Backend)")

try:
    start_time = time.time()
    response = requests.post(
        f"{frontend_url}/api/generate-simulation",
        json=payload,
        timeout=120
    )
    elapsed = time.time() - start_time

    print(f"\n✅ Response received in {elapsed:.2f} seconds")
    print(f"📊 Status Code: {response.status_code}")

    if response.status_code == 200:
        data = response.json()
        print("\n✅ SUCCESS! Frontend successfully talked to Backend.")
        print(f"   Simulation ID: {data.get('simulation_id')}")
    else:
        print(f"\n❌ FAILED. Status: {response.status_code}")
        print("Response:", response.text[:500])
        
        if response.status_code == 500 or response.status_code == 502:
             print("\n💡 TIP: If status is 500/502, Next.js might be failing to reach Backend.")
             print("   - Check if Backend is running on port 8001")
             print("   - Check .env.local has NEXT_PUBLIC_API_URL=http://127.0.0.1:8001")

except requests.exceptions.ConnectionError:
    print(f"\n❌ COULD NOT CONNECT to {frontend_url}")
    print("   Make sure Next.js is running! (npm run dev)")
